import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Group } from "src/app/models/products.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private group: Group[] = [];
  private groupUpdate = new Subject<Group[]>();
  groupID: number = 0;
  constructor(
    private http: HttpClient,
  ){}

  selectedGroup(id: number) {
    this.groupID = id;
  }

  getGroups() {
    this.http.get<{message: string, productsGroups: any}>( environment.apiUrl + "/api/productsGroups")
    .pipe(map(groupData => {
        return groupData.productsGroups.map((group: any) => {
          return {
            name: group.name,
            id: group._id,
          };
        });
      })
    ).subscribe(transformData => {
      this.group = transformData;
      this.groupUpdate.next([...this.group]);
    });
  }

  getgroupUpdatedListener() {
    return this.groupUpdate.asObservable();
  }

  getGroup(id: any) {
    return this.http.get<{_id: any, name: string}>( environment.apiUrl + "/api/productsGroups/" + id)
  }
}
