import { Injectable } from '@angular/core';
import data from 'src/assets/roles.json';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  getAllRoles(): string[] {
    return data.roles;
  }
}
