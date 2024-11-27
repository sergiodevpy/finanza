import { boot } from 'quasar/wrappers'
import { useStoreUsuarios } from 'src/stores/storeUsuarios'

export default boot(({ router }) => {
    router.beforeEach((to) => {
        const storeUsuarios = useStoreUsuarios()
        //si el usuario no está logeado
        if (!storeUsuarios.usuarioDetalle.id && to.path !== '/ingresar' && storeUsuarios.usuarioIngresado) {
            return '/ingresar'
        } 
        //si el usuario está logeado
        if (storeUsuarios.usuarioDetalle.id && to.path === '/ingresar') {
            return false
        }
    
  })
})