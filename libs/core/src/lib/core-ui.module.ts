import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import {
  MatCommonModule,
  MatLineModule,
  MatNativeDateModule,
  MatOptionModule,
  MatPseudoCheckboxModule,
  MatRippleModule
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import {
  IgxActionStripModule,
  IgxAutocompleteModule,
  IgxAvatarModule,
  IgxBannerModule,
  IgxButtonGroupModule,
  IgxButtonModule,
  IgxCalendarModule,
  IgxCardModule,
  IgxCarouselModule,
  IgxCheckboxModule,
  IgxComboModule,
  IgxCsvExporterService,
  IgxDatePickerModule,
  IgxDateTimeEditorModule,
  IgxDialogModule,
  IgxDividerModule,
  IgxDragDropModule,
  IgxDropDownModule,
  IgxExcelExporterService,
  IgxExpansionPanelModule,
  IgxFilterModule,
  IgxGridModule,
  IgxHierarchicalGridModule,
  IgxIconModule,
  IgxInputGroupModule,
  IgxLayoutModule,
  IgxListModule,
  IgxMaskModule,
  IgxNavbarModule,
  IgxNavigationDrawerModule,
  IgxRadioModule,
  IgxRippleModule,
  IgxSelectModule,
  IgxSliderModule,
  IgxSnackbarModule,
  IgxSwitchModule,
  IgxTabsModule,
  IgxTextSelectionModule,
  IgxTimePickerModule,
  IgxToastModule,
  IgxToggleModule,
  IgxTooltipModule,
  IgxTreeGridModule
} from '@infragistics/igniteui-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { QRCodeModule } from 'angularx-qrcode';
import { ToastrModule } from 'ngx-toastr';

const MatModules = [
  MatAutocompleteModule,
  MatBadgeModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatCommonModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatLineModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatOptionModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatPseudoCheckboxModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSliderModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  MatBottomSheetModule,
];

const CdkModules = [
  CdkStepperModule,
  CdkTableModule,
  CdkTreeModule,
  DragDropModule,
  PortalModule,
  ScrollingModule,
];

const IgxModules = [
  IgxComboModule,
  IgxButtonModule,
  IgxCheckboxModule,
  IgxDatePickerModule,
  IgxTimePickerModule,
  IgxDialogModule,
  IgxGridModule,
  IgxInputGroupModule,
  IgxIconModule,
  IgxRippleModule,
  IgxSwitchModule,
  IgxToastModule,
  IgxTreeGridModule,
  IgxRadioModule,
  IgxTabsModule,
  IgxTooltipModule,
  IgxLayoutModule,
  IgxToggleModule,
  IgxSnackbarModule,
  IgxBannerModule,
  IgxTextSelectionModule,
  IgxMaskModule,
  IgxButtonGroupModule,
  IgxCarouselModule,
  IgxSelectModule,
  IgxSliderModule,
  IgxListModule,
  IgxAvatarModule,
  IgxFilterModule,
  IgxHierarchicalGridModule,
  IgxNavbarModule,
  IgxAutocompleteModule,
  IgxCardModule,
  IgxDividerModule,
  IgxCalendarModule,
  IgxDropDownModule,
  IgxExpansionPanelModule,
  IgxDragDropModule,
  IgxNavigationDrawerModule,
  IgxDateTimeEditorModule,
  IgxActionStripModule
];

const IgxServices = [IgxExcelExporterService, IgxCsvExporterService];

@NgModule({
  declarations: [],
  imports: [
    IgxModules,
    MatModules,
    CdkModules,
    NgbModule,
    TranslateModule,
    QRCodeModule,
    ToastrModule.forRoot(),
  ],
  exports: [
    IgxModules,
    MatModules,
    CdkModules,
    NgbModule,
    QRCodeModule,
    ToastrModule,
  ],
  providers: [IgxServices],
})
export class CoreUIModule { }
