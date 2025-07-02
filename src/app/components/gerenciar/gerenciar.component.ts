import { Component, OnInit } from '@angular/core';
import { Contato } from '../../contato';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContatoService } from '../../services/contato.service';


@Component({
  selector: 'app-gerenciar',
  standalone: false,
  templateUrl: './gerenciar.component.html',
  styleUrl: './gerenciar.component.css'
})
export class GerenciarComponent implements OnInit{

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
      busca: ['name'],
      grupo: [''],
      favoritos: [false],
      ordenarAlfabeto: [false]
    });
  }

  ngOnInit(): void {
    this.loadContatos();

    this.filtro.valueChanges.subscribe(() => {
    this.loadContatos();
  });
}

  loadContatos() {
    const nome = this.filtro.get('name')?.value;
    const busca = this.filtro.get('busca')?.value;
    const favoritos = this.filtro.get('favoritos')?.value;
    const ordenarAZ = this.filtro.get('ordenarAlfabeto')?.value;

    this.gerenciarContato.filtrarContatos(nome, busca, favoritos, ordenarAZ).subscribe({
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
    const grupo = this.filtro.get('grupo')?.value || '';

    if (!grupo) {
      return this.Contato;
    }

    return this.Contato.filter(c=>c.grupo === grupo);
  }
}



