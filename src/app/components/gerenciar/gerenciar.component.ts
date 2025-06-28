import { Component } from '@angular/core';
import { Contato } from '../../contato';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GerenciarService } from '../../services/gerenciar.service';

@Component({
  selector: 'app-gerenciar',
  standalone: false,
  templateUrl: './gerenciar.component.html',
  styleUrl: './gerenciar.component.css'
})
export class GerenciarComponent {

  Contato: Contato[] = [];
  formGroupContato: FormGroup;
  isEditing: boolean = false;

  filtrarNome: string = '';
  filtrarGrupo: string = '';
  apenasFavoritos: boolean = false;
  ordenarAlfabeto: boolean = false;

  constructor(private gerenciarContato: GerenciarService, private formBuilder: FormBuilder) {
    this.formGroupContato = this.formBuilder.group({
      id: [''],
      name: [''],
      number: [''],
      email: [''],
      apelido: [''],
      endereco: [''],
      grupo: [''],
      informacao: [''],
      dataAniversario: [''],
      favorito: [false]
    });
  }

  ngOnInit(): void {
    this.loadContatos();
  }

  loadContatos() {
    this.gerenciarContato.getAll().subscribe({
      next: json => this.Contato = json
    });
  }

  delete(contato: Contato) {
    this.gerenciarContato.delete(contato).subscribe({
      next: () => this.loadContatos()
    });
  }

  onClickUpdate(contato: Contato) {
    this.isEditing = true;
    this.formGroupContato.setValue(contato);
  }

  update() {
    this.gerenciarContato.update(this.formGroupContato.value).subscribe({
      next: () => {
        this.loadContatos();
        this.clear();
      }
    });
  }

  clear() {
    this.isEditing = false;
    this.formGroupContato.reset();
  }


  get filtrarContato(): Contato[]{
    let filtrados = this.Contato;

    if (this.filtrarNome) {
      filtrados = filtrados.filter(c =>
        c.name.toLowerCase().includes(this.filtrarNome.toLowerCase())
      );
    }

    if (this.filtrarGrupo) {
      filtrados = filtrados.filter(c => c.grupo === this.filtrarGrupo);
    }

    if (this.apenasFavoritos) {
      filtrados = filtrados.filter(c => c.favorito);
    }

    if (this.ordenarAlfabeto) {
      filtrados = [...filtrados].sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtrados;
    }
}



