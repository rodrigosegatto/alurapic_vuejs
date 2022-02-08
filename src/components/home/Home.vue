<template>
  <div>
    <h1 class="centralizado">{{ titulo }} <img src="../../../static/teste.jpg" width="60px" /></h1>
    <p class="centralizado">{{ mensagem }}</p>
    <input type="search" class="filtro" placeholder="filtre pelo título da foto" v-on:input="filtro = $event.target.value">
    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComFiltro" :key="foto.url">
        <meu-painel :titulo="foto.titulo">
            <imagem-responsiva v-meu-transform:scale.animate="1.2" :url="foto.url" :titulo="foto.titulo"></imagem-responsiva>
            <router-link :to="{name: 'altera', params: { id: foto._id } }">
              <meu-botao
                tipo="button"
                rotulo="ALTERAR" />
            </router-link>
            <meu-botao
              tipo="button"
              rotulo="REMOVER"
              @botaoAtivado="remove(foto)"
              :confirmacao="true"
              estilo="perigo" />
        </meu-painel>
      </li>
    </ul>
  </div>
</template>

<script>
import Painel from '../shared/painel/Painel.vue';
import Botao from '../shared/botao/Botao.vue';
import ImagemResponsiva from '../shared/imagem-responsiva/imagemResponsiva.vue';
import transform from '../../directives/Transform';
import FotoService from '../../domain/foto/FotoService';

export default {
  components:{
    'meu-painel': Painel,
    'meu-botao': Botao,
    'imagem-responsiva': ImagemResponsiva
  },
  directives: {
    'meu-transform': transform
  },
  data() {
    return {
      titulo: 'AluraPic',
      fotos: [],
      filtro: '',
      mensagem: ''
    }
  },
  computed: {
    fotosComFiltro(){
      if(this.filtro){
        let exp = new RegExp(this.filtro.trim(),'i');
        return this.fotos.filter(foto => exp.test(foto.titulo));
      }else{
        return this.fotos;
      }
    }
  },
  methods:{
    remove(foto) {
      this.service
        .apaga(foto._id)
        .then(
          () => {
            let indice = this.fotos.indexOf(foto);
            this.fotos.splice(indice, 1);
            this.mensagem = 'Foto removida com sucesso'
          },
          err => {
            console.log(err);
            this.mensagem = err.message;
          }
        );

      /* //Anterior
      this.$http
        .delete('v1/fotos/'+foto._id)
        .then(() =>
        {
          let indice = this.fotos.indexOf(foto);
          this.fotos.splice(indice,1);
          this.mensagem = 'Foto removida com sucesso'
        }, err => {
          console.log(err);
          this.mensagem = 'Não foi possível remover a foto';
        });*/
    }
  },
  created() {

    this.service = new FotoService(this.$resource);
    this.service
      .lista()
      .then(fotos => this.fotos = fotos, err => {
        console.log(err);
        this.mensagem = err.message;
      });

    //Forma anterior
    /*this.$http.get('v1/fotos')
      .then(res => res.json())
      .then(fotos => this.fotos = fotos, err => console.log(err));*/
  }
}
</script>

<style>

  .centralizado{
    text-align: center;
  }

  .lista-fotos{
    list-style: none;
  }

  .lista-fotos .lista-fotos-item{
    display: inline-block;
  }

  .filtro {
    display: block;
    width: 100%;
  }

</style>
