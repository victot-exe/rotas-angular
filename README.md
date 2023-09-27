# Rotas

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Declarando o path(lugar de onde vem as rotas)
No arquivo app-routing.module.ts
~~~
cont routes: Routes =[
  {path: '', component: TitleComponent, pathMatch: 'full'},
  {path: 'portifolio', component: CardComponent, pathMatch: 'prefix'},
]
~~~
* `path:` -> Especificação da rota, o que vai vir após o `/`
* `component:` -> Component que deseja colocar na rota
* `pathMatch` -> Modo de correspondência `'full'`=> url exata | `'prefix'`=> pode conter aquilo no prefixo e um pouco mais, é mais maleável, correspondência não exata, além de ser o valor default (valor que é entendido quando não passa nada)
### Rota coringa
__Quando o usuário acessa uma rota que não existe e vc pode redirecionar a rota dele__
* dentro de `const routes: Routes=[]`:
~~~
{ path: '**', redirectTo: ''}
~~~
* `'**'` -> representa qualquer caminho que não exista
* `redirectTo:` -> redirecionar para e na string você coloca a página que é para redirecionar, geralmente é aqui que enviamos para a pagina 404 not found

### Navegando entre páginas com `RouterLink`
* criar component `ng g c shared/menu` -> esse component fica nessa pasta pois ele será usado para navegar entre as páginas
~~~
<div>
  <ul>
    <li><a href="/">HOME</a></li>
    <li><a href="/portifolio">PORTIFOLIO</a></li>
  </ul>
</div>
~~~
* O código acima funciona e dá o resultado desejado, porém a cada vez que vc entra no link ele restarta a aplicação, o refresh é inimigo de uma singlePage app, por isso usamos o `[routerLink]=['/']`
~~~
<div>
  <ul>
    <li><a [routerLink]="['/']">HOME</a></li>
    <li><a [routerLink]="['/portifolio']">PORTIFOLIO</a></li>
  </ul>
</div>
~~~
* Assim vc muda dinâmicamente os components sem dar o refresh, deixando a page muito mais rápida.
### `ActiveRouter`
~~~
<div>
  <ul>
    <li>
      <a [routerLink]="['/']"
      [routerLinkActive]="['activated']"
      >HOME
      </a>
    </li>
    <li>
      <a [routerLink]="['/portifolio']"
      [routerLinkActive]="['activated']"
      >PORTIFOLIO
      </a>
    </li>
  </ul>
</div>
~~~
* o `[routerLinkActive]="['classe.css']"`-> indica uma classe no css que mudará o estilo do link quando a rota for ativa, por ficar entre parênteses podem ser invocadas várias classes
* o `[routerLinkActiveOptions]="{exact: true}"`-> só muda quando a rota for exatamente a indicada

### Recuperando parâmetros de rotas
__Muitas vezes quando for feita alguma requisição de rota ela irá buscar algo de alguma API, por isso armazenamos em variáveis__
* app-routing.module.ts
~~~
cont routes: Routes =[
  {path: '', component: TitleComponent, pathMatch: 'full'},
  {path: 'portifolio/:id', component: CardComponent, pathMatch: 'prefix'},
]
~~~
* Após o `'portifolio/:id'` -> ele sinaliza que é para criar uma variável chamada `id`
__Como recuperar?__
* No arquivo ts do component, no método construtor:
~~~
//http://localhost:4200/portifolio/1 => o console vai exibir o {1}
  constructor(private parametrizador: ActivatedRoute) {
    this.parametrizador.params.subscribe(
      res => console.log(res)
    )
  }
~~~
  ### QueryParams
  * Parâmetros que são passadas pela url após o link
  * Dentro do `constructor(){}`
~~~
//http://localhost:4200/portifolio/1?%7Bname=victor&token=123%7D => para recuperar após o 1
      this.parametrizador.queryParams.subscribe(
        res => console.log(res)
      )
~~~
### Redirecionamento por components
__Como forçar um component a navegar para outra rota__
* inicializar `private nagador: Router` nos parâmetros do `constructor`
* No `ngOnInit(): void{}` que fica após o fechamento do constructor => é o método que executa o que está dentro dele onInit ou seja, quando é iniciado  
~~~
ngOnInit(): void {
  setInterval(()=>{
      this.nagador.navigate(['/'])
  }, 5000)
}
~~~
* `setInternal`-> método
* `5000` -> Tempo em milissegundos para o redirecionamento
* `this.nagador.navigate(['/'])` -> diz que após o tempo definido é para essa rota que vai
### Rotas Children
__Rotas filhas__
* dentro de `app-routing.module.ts` em `const routes: Routes ={...}`
~~~
{path: 'portifolio', component: CardComponent, children:[

  {path: ':id', component: CardComponent},

]},
~~~
* Dessa forma da pra englobar tanto o portifólio sem a id, quanto quando tiver a id

### Parâmetros de children
__Parâmetros de filhos__
* dentro do `constructor(){...}`
~~~
this.parametrizador.firstChild?.params.subscribe(
  res => console.log(res)
)
~~~
* `.fistChild?` -> firstchild é o primeiro filho da classe e a `?` indica que pode haver ou não, para o caso de só executar se houver.
