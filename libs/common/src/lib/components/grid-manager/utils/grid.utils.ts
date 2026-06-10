import { Injectable } from '@angular/core';
import {
  FilteringLogic,
  IFilteringExpression,
  IFilteringExpressionsTree,
  ISortingExpression,
  SortingDirection,
} from '@infragistics/igniteui-angular';
import { DataStorageTypes, Utils } from '@lib-common';
import {
  addMonths,
  addYears,
  endOfMonth,
  endOfYear,
  format,
  startOfMonth,
  startOfYear,
  subDays,
  subMonths,
  subYears,
} from 'date-fns';

const EMPTY_STRING = '';
const SQL_DATE_FORMAT = 'yyyy-MM-dd';

const QUERY_VAL_PLACEHOLDER = '{*VAL*}';
const QUERY_VAL2_PLACEHOLDER = '{*VAL2*}';
const QUERY_COLUMN_PLACEHOLDER = '{*COL*}';

const columnNameRegEx = /\{\*COL\*\}/g;
const queryValueRegEx = /\{\*VAL\*\}/g;
const queryValue2RegEx = /\{\*VAL2\*\}/g;

const NULL_VALUE = null;
const FILTER_OPERATION = {
  CONTAINS: `${QUERY_COLUMN_PLACEHOLDER} LIKE '%${QUERY_VAL_PLACEHOLDER}%'`,
  STARTS_WITH: `${QUERY_COLUMN_PLACEHOLDER} LIKE '%${QUERY_VAL_PLACEHOLDER}'`,
  ENDS_WITH: `${QUERY_COLUMN_PLACEHOLDER} LIKE '${QUERY_VAL_PLACEHOLDER}%'`,
  EQUALS: `${QUERY_COLUMN_PLACEHOLDER} = ${QUERY_VAL_PLACEHOLDER}`,
  DOES_NOT_EQUAL: `${QUERY_COLUMN_PLACEHOLDER} <> ${QUERY_VAL_PLACEHOLDER}`,
  DOES_NOT_CONTAIN: `${QUERY_COLUMN_PLACEHOLDER} NOT LIKE '%${QUERY_VAL_PLACEHOLDER}%'`,
  GREATER_THAN: `${QUERY_COLUMN_PLACEHOLDER} > ${QUERY_VAL_PLACEHOLDER}`,
  LESS_THAN: `${QUERY_COLUMN_PLACEHOLDER} < ${QUERY_VAL_PLACEHOLDER}`,
  LESS_THAN_EQUAL: `${QUERY_COLUMN_PLACEHOLDER} <= ${QUERY_VAL_PLACEHOLDER}`,
  GREATER_THAN_EQUAL: `${QUERY_COLUMN_PLACEHOLDER} >= ${QUERY_VAL_PLACEHOLDER}`,
};

const REDIS_FILTER_OPERATION = {
  CONTAINS: `@${QUERY_COLUMN_PLACEHOLDER}:*${QUERY_VAL_PLACEHOLDER}*`,
  DOES_NOT_CONTAIN: `-@${QUERY_COLUMN_PLACEHOLDER}:*${QUERY_VAL_PLACEHOLDER}*`,
  STARTS_WITH: `@${QUERY_COLUMN_PLACEHOLDER}:${QUERY_VAL_PLACEHOLDER}*`,
  ENDS_WITH: `@${QUERY_COLUMN_PLACEHOLDER}:*${QUERY_VAL_PLACEHOLDER}`,
  EQUALS_STRINNG: `@${QUERY_COLUMN_PLACEHOLDER}:${QUERY_VAL_PLACEHOLDER}`,

  EQUALS: `@${QUERY_COLUMN_PLACEHOLDER}:[${QUERY_VAL_PLACEHOLDER},${QUERY_VAL_PLACEHOLDER}]`,
  DOES_NOT_EQUAL: `-@${QUERY_COLUMN_PLACEHOLDER}:[${QUERY_VAL_PLACEHOLDER},${QUERY_VAL_PLACEHOLDER}]`,
  RANGE: `@${QUERY_COLUMN_PLACEHOLDER}:[${QUERY_VAL_PLACEHOLDER},${QUERY_VAL2_PLACEHOLDER}]`,

  TRUE: `@${QUERY_COLUMN_PLACEHOLDER}:[1,1]`,
  FALSE: `@${QUERY_COLUMN_PLACEHOLDER}:[0,0]`,
};

// the number of .net ticks at the unix epoch
const epochTicks = 621355968000000000;
const ticksPerMillisecond = 10000;

export enum FilteringRedisLogic {
  And = ' ',
  Or = ' | ',
}

@Injectable()
export class GridUtils {
  static getType(obj: any): string {
    const objType = typeof obj;

    switch (objType) {
      case 'number': {
        return 'number';
      }
      case 'string': {
        if (Utils.isValidIsoDate(obj)) {
          return 'date';
        }

        return 'string';
      }
      case 'boolean': {
        return 'boolean';
      }
      default: {
        return 'string';
      }
    }
  }

  static BuildOrderBySQL(sortingExpressions: ISortingExpression[]): string {
    let sqlBuilder = EMPTY_STRING;

    let dirString = EMPTY_STRING;
    if (sortingExpressions && sortingExpressions.length > 0) {
      sortingExpressions.forEach((sortExp: ISortingExpression) => {
        if (sortExp.dir !== SortingDirection.None) {
          switch (sortExp.dir) {
            case SortingDirection.Desc: {
              dirString = 'DESC';
              break;
            }
            case SortingDirection.Asc: {
              dirString = 'ASC';
              break;
            }
          }

          sqlBuilder += ` ${sortExp.fieldName} ${dirString},`;
        }
      });

      sqlBuilder = sqlBuilder.slice(0, -1);
    }

    return sqlBuilder;
  }

  static BuildWhere(
    gridFilterExpr: IFilteringExpressionsTree,
    remoteStorageType: DataStorageTypes
  ): string {
    let sqlBuilder = EMPTY_STRING;

    if (
      gridFilterExpr &&
      gridFilterExpr.filteringOperands &&
      gridFilterExpr.filteringOperands.length > 0
    ) {
      gridFilterExpr.filteringOperands.forEach((topOperand) => {
        if (sqlBuilder !== EMPTY_STRING) {
          if (remoteStorageType == DataStorageTypes.Redis) {
            sqlBuilder += `${FilteringRedisLogic.And}`;
          } else {
            sqlBuilder += ` ${FilteringLogic[FilteringLogic.And].toUpperCase()} `;
          }
        }
        const operandSql = GridUtils._checkOperandsExp(topOperand, remoteStorageType);
        sqlBuilder += operandSql;
      });

      if (sqlBuilder !== EMPTY_STRING) {
        sqlBuilder = `${sqlBuilder}`;
      }
    }

    return sqlBuilder;
  }

  private static _checkOperandsExp(
    expressions: IFilteringExpressionsTree | IFilteringExpression,
    remoteStorageType: DataStorageTypes
  ): string {
    let sql = EMPTY_STRING;

    // if (expressions instanceof FilteringExpressionsTree) {
    if ('filteringOperands' in expressions) {
      const expressionsTree = expressions as IFilteringExpressionsTree;
      const operator = expressionsTree.operator;

      expressions.filteringOperands.forEach((operand) => {
        if (sql !== EMPTY_STRING) {
          if (remoteStorageType == DataStorageTypes.Redis) {
            let val = operator == 0 ? 'And' : 'Or';
            sql += `${FilteringRedisLogic[val]}`;
          } else {
            sql += ` ${FilteringLogic[operator].toUpperCase()} `;
          }
        }

        sql += GridUtils._checkOperandsExp(operand, remoteStorageType);
      });
    } else {
      const expression = expressions as IFilteringExpression;

      if (remoteStorageType == DataStorageTypes.Redis) {
        sql += GridUtils._buildRedisQueryFromExp(expression);
      } else {
        sql += GridUtils._buildQueryFromExp(expression);
      }
    }
    return sql;
  }

  private static _buildQueryFromExp(expr: IFilteringExpression): string {
    const column = expr.fieldName;
    const condition = expr.condition;
    const val = expr.searchVal;

    let isStringValue = false;
    let filterValue: any;
    let conditionQuery = EMPTY_STRING;

    if (val instanceof Date) {
      filterValue = `'${format(val, SQL_DATE_FORMAT)}'`;
    } else if (Utils.isNumber(val)) {
      filterValue = val;
    } else {
      isStringValue = true;
      filterValue = `'${val}'`;
    }

    switch (condition.name) {
      case 'contains': {
        if (isStringValue) {
          filterValue = filterValue.replace(/'/g, '');
        }

        conditionQuery = `${FILTER_OPERATION.CONTAINS}`;
        break;
      }
      case 'startsWith': {
        if (isStringValue) {
          filterValue = filterValue.replace(/'/g, '');
        }

        conditionQuery = `${FILTER_OPERATION.STARTS_WITH}`;
        break;
      }
      case 'endsWith': {
        if (isStringValue) {
          filterValue = filterValue.replace(/'/g, '');
        }

        conditionQuery = `${FILTER_OPERATION.ENDS_WITH}`;
        break;
      }
      case 'equals': {
        conditionQuery = `${FILTER_OPERATION.EQUALS}`;
        break;
      }
      case 'doesNotEqual': {
        conditionQuery = `${FILTER_OPERATION.DOES_NOT_EQUAL}`;
        break;
      }
      case 'doesNotContain': {
        if (isStringValue) {
          filterValue = filterValue.replace(/'/g, '');
        }

        conditionQuery = `${FILTER_OPERATION.DOES_NOT_CONTAIN}`;
        break;
      }
      case 'greaterThan': {
        conditionQuery = `${FILTER_OPERATION.GREATER_THAN}`;
        break;
      }
      case 'greaterThanOrEqualTo': {
        conditionQuery = `${FILTER_OPERATION.GREATER_THAN_EQUAL}`;
        break;
      }
      case 'lessThan': {
        conditionQuery = `${FILTER_OPERATION.LESS_THAN}`;
        break;
      }
      case 'lessThanOrEqualTo': {
        conditionQuery = `${FILTER_OPERATION.LESS_THAN_EQUAL}`;
        break;
      }
      case 'empty': {
        conditionQuery = EMPTY_STRING;
        break;
      }
      case 'notEmpty': {
        conditionQuery = EMPTY_STRING;
        break;
      }
      case 'null': {
        conditionQuery = `IS ${NULL_VALUE}`;
        break;
      }
      case 'notNull': {
        conditionQuery = `IS NOT ${NULL_VALUE}`;
        break;
      }
      case 'true': {
        filterValue = 1;

        conditionQuery = `${FILTER_OPERATION.EQUALS}`;
        break;
      }
      case 'all': {
        conditionQuery = EMPTY_STRING;
        break;
      }
      case 'false': {
        filterValue = 0;

        conditionQuery = `${FILTER_OPERATION.EQUALS}`;
        break;
      }
      case 'before': {
        conditionQuery = `${FILTER_OPERATION.LESS_THAN}`;
        break;
      }
      case 'after': {
        conditionQuery = `${FILTER_OPERATION.GREATER_THAN}`;
        break;
      }
      case 'today': {
        filterValue = `'${format(new Date(), SQL_DATE_FORMAT)}'`;
        conditionQuery = `${FILTER_OPERATION.EQUALS} `;
        break;
      }
      case 'yesterday': {
        filterValue = `'${format(subDays(new Date(), 1), SQL_DATE_FORMAT)}'`;
        conditionQuery = `${FILTER_OPERATION.EQUALS}`;
        break;
      }
      case 'thisMonth': {
        const _startOfMonth = format(startOfMonth(new Date()), SQL_DATE_FORMAT);
        const _endOfMonth = format(endOfMonth(new Date()), SQL_DATE_FORMAT);

        conditionQuery = `${QUERY_COLUMN_PLACEHOLDER} > '${_startOfMonth}' AND ${QUERY_COLUMN_PLACEHOLDER} < '${_endOfMonth}'`;
        break;
      }
      case 'lastMonth': {
        const lastMonth = subMonths(new Date(), 1);
        const _startOfMonth = format(startOfMonth(lastMonth), SQL_DATE_FORMAT);
        const _endOfMonth = format(endOfMonth(lastMonth), SQL_DATE_FORMAT);

        conditionQuery = `${QUERY_COLUMN_PLACEHOLDER} > '${_startOfMonth}' AND ${QUERY_COLUMN_PLACEHOLDER} < '${_endOfMonth}'`;
        break;
      }
      case 'nextMonth': {
        const nextMonth = addMonths(new Date(), 1);
        const _startOfMonth = format(startOfMonth(nextMonth), SQL_DATE_FORMAT);
        const _endOfMonth = format(endOfMonth(nextMonth), SQL_DATE_FORMAT);

        conditionQuery = `${QUERY_COLUMN_PLACEHOLDER} > '${_startOfMonth}' AND ${QUERY_COLUMN_PLACEHOLDER} < '${_endOfMonth}'`;
        break;
      }
      case 'thisYear': {
        const _startOYear = format(startOfYear(new Date()), SQL_DATE_FORMAT);
        const _endOfYear = format(endOfYear(new Date()), SQL_DATE_FORMAT);

        conditionQuery = `${QUERY_COLUMN_PLACEHOLDER} > '${_startOYear}' AND ${QUERY_COLUMN_PLACEHOLDER} < '${_endOfYear}'`;
        break;
      }
      case 'lastYear': {
        const lastYear = subYears(new Date(), 1);
        const _startOYear = format(startOfYear(lastYear), SQL_DATE_FORMAT);
        const _endOfYear = format(endOfYear(lastYear), SQL_DATE_FORMAT);

        conditionQuery = `${QUERY_COLUMN_PLACEHOLDER} > '${_startOYear}' AND ${QUERY_COLUMN_PLACEHOLDER} < '${_endOfYear}'`;
        break;
      }
      case 'nextYear': {
        const nextYear = addYears(new Date(), 1);
        const _startOYear = format(startOfYear(nextYear), SQL_DATE_FORMAT);
        const _endOfYear = format(endOfYear(nextYear), SQL_DATE_FORMAT);

        conditionQuery = `${QUERY_COLUMN_PLACEHOLDER} > '${_startOYear}' AND ${QUERY_COLUMN_PLACEHOLDER} < '${_endOfYear}'`;
        break;
      }
      default: {
        conditionQuery = EMPTY_STRING;
      }
    }

    return conditionQuery.replace(queryValueRegEx, filterValue).replace(columnNameRegEx, column);
  }

  private static _buildRedisQueryFromExp(expr: IFilteringExpression): string {
    const column = expr.fieldName.charAt(0).toTurkishUpperCase() + expr.fieldName.substring(1);

    const condition = expr.condition;
    const val = expr.searchVal;

    let isStringValue = false;
    let filterValue: any, filterValue2: any;
    let conditionQuery = EMPTY_STRING;

    if (val instanceof Date) {
      filterValue = epochTicks + val.getTime() * ticksPerMillisecond;
    } else if (Utils.isNumber(val)) {
      filterValue = val;
    } else {
      isStringValue = true;
      filterValue = `'${val}'`;
    }

    console.log('expr,conditionn', expr, condition);
    switch (condition.name) {
      case 'contains': {
        filterValue = filterValue.replace(/'/g, '');
        conditionQuery = `${REDIS_FILTER_OPERATION.CONTAINS}`;
        break;
      }
      case 'doesNotContain': {
        filterValue = filterValue.replace(/'/g, '');
        conditionQuery = `${REDIS_FILTER_OPERATION.DOES_NOT_CONTAIN}`;
        break;
      }
      case 'startsWith': {
        filterValue = filterValue.replace(/'/g, '');
        conditionQuery = `${REDIS_FILTER_OPERATION.STARTS_WITH}`;
        break;
      }
      case 'endsWith': {
        filterValue = filterValue.replace(/'/g, '');
        conditionQuery = `${REDIS_FILTER_OPERATION.ENDS_WITH}`;
        break;
      }
      case 'equals': {
        if (isStringValue) {
          filterValue = filterValue.replace(/'/g, '');
          conditionQuery = `${REDIS_FILTER_OPERATION.EQUALS_STRINNG}`;
        } else {
          conditionQuery = `${REDIS_FILTER_OPERATION.EQUALS}`;
        }
        break;
      }
      case 'doesNotEqual': {
        conditionQuery = `${REDIS_FILTER_OPERATION.DOES_NOT_EQUAL}`;
        break;
      }
      case 'after':
      case 'greaterThan': {
        filterValue += 1;
        filterValue2 = '+inf';
        conditionQuery = `${REDIS_FILTER_OPERATION.RANGE}`;
        break;
      }
      case 'greaterThanOrEqualTo': {
        filterValue2 = '+inf';
        conditionQuery = `${REDIS_FILTER_OPERATION.RANGE}`;
        break;
      }
      case 'before':
      case 'lessThan': {
        filterValue2 = filterValue - 1;
        filterValue = '-inf';
        conditionQuery = `${REDIS_FILTER_OPERATION.RANGE}`;
        break;
      }
      case 'lessThanOrEqualTo': {
        filterValue2 = filterValue;
        filterValue = '-inf';
        conditionQuery = `${REDIS_FILTER_OPERATION.RANGE}`;
        break;
      }
      case 'all': {
        conditionQuery = EMPTY_STRING;
        break;
      }
      case 'true': {
        conditionQuery = `${REDIS_FILTER_OPERATION.TRUE}`;
        break;
      }
      case 'false': {
        conditionQuery = `${REDIS_FILTER_OPERATION.FALSE}`;
        break;
      }
      default: {
        conditionQuery = EMPTY_STRING;
      }
    }
    return conditionQuery
      .replace(queryValueRegEx, filterValue)
      .replace(queryValue2RegEx, filterValue2)
      .replace(columnNameRegEx, column);
  }
  constructor() { }
}
