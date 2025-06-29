import { Component } from '@angular/core';
import { Contato } from '../../contato';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContatoService } from '../../services/contato.service';


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
  filtro: FormGroup;

  constructor(private gerenciarContato: ContatoService, private formBuilder: FormBuilder) {
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

    this.filtro = this.formBuilder.group({
      name: [''],
      grupo: [''],
      favoritos: [false],
      ordenarAlfabeto: [false]
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

  toggleOrdem(): void {
    const atual = this.filtro.get('ordenarAlfabeto')?.value;
    this.filtro.get('ordenarAlfabeto')?.setValue(!atual);
  }


  get filtrarContato(): Contato[]{
    let filtrados = this.Contato;

    const name = this.filtro.get('name')?.value?.toLowerCase() || '';
    const grupo = this.filtro.get('grupo')?.value || '';
    const favoritos = this.filtro.get('favoritos')?.value;
    const ordenarAlfabeto = this.filtro.get('ordenarAlfabeto')?.value;

    if (name) {
      filtrados = filtrados.filter(c =>
      c.name.toLowerCase().includes(name));
    }

    if (grupo) {
      filtrados = filtrados.filter(c => c.grupo === grupo);
    }

    if (favoritos) {
      filtrados = filtrados.filter(c => c.favorito);
    }

    if (ordenarAlfabeto) {
      filtrados = [...filtrados].sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtrados;

  }
}



