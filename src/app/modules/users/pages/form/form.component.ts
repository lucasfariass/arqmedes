import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { LocationService } from '../../services/location.service';
import { UserService } from '../../services/user.service';
import {
  CivilStatusDescription,
  CivilStatusEnum,
} from './../../models/civil-status.enum';
import { ISelecInput } from './../../models/select-input.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  form: FormGroup;
  civilStatus: ISelecInput[];
  ufs: Observable<ISelecInput[]>;
  cities: Observable<ISelecInput[]>;
  idUser: number;

  title = 'Incluir Usuário';
  btn = 'Incluir';

  subscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private locationService: LocationService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.idUser = this.activatedRoute.snapshot.params['id'];
    this.createForm();
    this.civilStatus = this.getCivilStatus();
    this.ufs = this.getUFs();
    if (this.idUser) {
      this.title = 'Editar Usuário';
      this.btn = 'Alterar';
      this.getUserById();
    }
    this.ref.detectChanges();
  }

  private getUserById() {
    this.userService.getUserById(this.idUser).subscribe((user) => {
      this.form.patchValue(user);
    });
  }

  private createForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      cpf: [{ disabled: this.idUser, value: '' }, [Validators.required]],
      profession: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      civilStatus: ['', [Validators.required]],
      city: [{ disabled: true, value: '' }, [Validators.required]],
      uf: ['', [Validators.required]],
    });

    this.subscriptions.push(
      this.form
        .get('uf')
        .valueChanges.pipe(filter((value) => value !== null))
        .subscribe((value: ISelecInput) => {
          this.cities = this.getCitiesByUf(value.value);
          this.form.get('city').enable();
        })
    );
  }

  private getCivilStatus() {
    return Object.values(CivilStatusEnum).map((value) => {
      return { value: value, description: CivilStatusDescription[value] };
    });
  }

  private getUFs() {
    return this.locationService.getStates().pipe(
      map((states) => {
        return states.map((state) => {
          return { value: state.id, description: state.sigla };
        });
      })
    );
  }

  private getCitiesByUf(state: string) {
    return this.locationService.getCitiesByState(state).pipe(
      map((cities) => {
        return cities.map((city) => {
          return { value: city.id, description: city.nome };
        });
      })
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.idUser ? this.edit() : this.register();
    }
  }

  private register() {
    this.userService.registerUser(this.form.getRawValue()).subscribe(() => {
      this.snackBar.open('Usuário adicionado com sucesso!', 'OK');
      this.router.navigateByUrl('/users/list');
    });
  }

  private edit() {
    this.userService
      .editUser(this.form.getRawValue(), this.idUser)
      .subscribe(() => {
        this.snackBar.open('Usuário editado com sucesso!', 'OK');
        this.router.navigateByUrl('/users/list');
      });
  }
}
