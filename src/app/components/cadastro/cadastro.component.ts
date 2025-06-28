import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CadastroService } from '../../services/cadastro.service';


@Component({
  selector: 'app-cadastro',
  standalone: false,
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent implements OnInit{

  formGroupCadastro: FormGroup;
  visualizarMais: boolean = false;

  constructor(private formBuilder: FormBuilder, private cadastroContato: CadastroService){

    this.formGroupCadastro = formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      number: ['', Validators.required],
      email: [''],
      grupo: [''],
      apelido: [''],
      endereco: [''],
      informacao: [''],
      dataAniversario: [''],
      favorito: [false]
    });
  }

  ngOnInit(): void {
      
  }

  toggleVisualizarMais(){
    this.visualizarMais = !this.visualizarMais
  }

  cadastrar(): void {
    if (this.formGroupCadastro.valid) {
      this.cadastroContato.save(this.formGroupCadastro.value).subscribe();
      this.formGroupCadastro.reset();
      this.visualizarMais = false;
    }
  }

}
