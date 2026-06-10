import { Injectable, OnDestroy } from "@angular/core";
import { ConfigurationService, IUser, UserInfoService } from "@lib-core";
import * as signalr from '@microsoft/signalr';
import { Subject } from "rxjs";

export enum HubEvents {
  JOIN_GROUP = "JoinGroup",
  LEAVE_GROUP = "LeaveGroup",
  REFRESH_APP = "RefreshApp",
  SHIFT_START_END = "ShiftStartEnd"
}

@Injectable({
  providedIn: 'root'
})
export class SignalRService implements OnDestroy {
  private _manuelStop = false;
  private _hubConnection: signalr.HubConnection;

  private readonly groupName = "sfm-devices";
  private _user: IUser;

  private refreshDataSubject = new Subject<void>();
  refreshData$ = this.refreshDataSubject.asObservable();

  get Connected() {
    return this._hubConnection.state === "Connected";
  }

  constructor(
    private _configuration: ConfigurationService,
    private _userInfoService: UserInfoService) {
    this._user = _userInfoService.CurrentUser;

    this._hubConnection = new signalr.HubConnectionBuilder()
      .withUrl(this._configuration.getAppSettings().HubServer)
      .withAutomaticReconnect([0, 1000, 1000, 1000, 1000])
      .build();

    this.registerSignalREvents();
  }

  ngOnDestroy(): void {
    this._hubConnection.off(HubEvents.REFRESH_APP);
  }

  public async stopConnection() {
    if (!this.Connected) return;
    this._manuelStop = true;
    await this._hubConnection.send(HubEvents.LEAVE_GROUP, this.groupName);
    await this._hubConnection.send(HubEvents.LEAVE_GROUP, this._user.pdPersonalID.toString());
    await this._hubConnection.stop();
  }

  public async startConnection() {
    try {
      console.log("startConnectionn");

      if (this.Connected) {
        return;
      }

      await this._hubConnection.start().then(() => {
        console.log('Connection started id', this._hubConnection.connectionId);

        this._manuelStop = false;
        setTimeout(() => this.joinGroup(), 1000)
      }).catch(err => console.log('Error while starting connection: ' + err))
    } catch (error) {
      console.error(error);
      setTimeout(() => this.startConnection(), 1000);
    }
  }

  joinGroup() {
    this._hubConnection.send(HubEvents.JOIN_GROUP, this.groupName)
      .then(() => {
        console.log("JOIN_GROUP invoked");
      })
      .catch(e => {
        console.log("JOIN_GROUP invoked err:", e);
      });


    this._hubConnection.send(HubEvents.JOIN_GROUP, this._user.pdPersonalID.toString())
      .then(() => {
        console.log("JOIN_GROUP pdpersoneller invoked");
      })
      .catch(e => {
        console.log("JOIN_GROUP pdpersoneller invoked err:", e);
      });
  }

  private registerSignalREvents() {
    this._hubConnection.onclose(() => {
      console.log("onclose -> id -> ", this._hubConnection.connectionId);
      if (!this._manuelStop) {
        this.startConnection();
      }
    });

    this._hubConnection.onreconnected(() => {
      console.log("onreconnected id", this._hubConnection.connectionId);
      setTimeout(() => this.joinGroup(), 1000);
    });

    this._hubConnection.on(HubEvents.REFRESH_APP, () => {
      location.reload();
    });

    this._hubConnection.on(HubEvents.SHIFT_START_END, () => {
      this.refreshDataSubject.next();
    });
  }
}
