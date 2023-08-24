import { Injectable } from '@angular/core';
import data from '../resources/roles.json';
import { Roles } from '../models/roles';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  getAllRoles(): string[] {
    return data.roles;
}
}
