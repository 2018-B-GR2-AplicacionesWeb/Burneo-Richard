// usuario.module.ts

import {Module} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {UsuarioController} from "./usuario.controller";

@Module({
    imports:[],
    controllers:[
        UsuarioController
    ],
    providers:[
        UsuarioService
    ],
    exports:[
        UsuarioService
    ]
})
export class UsuarioModule {
}
