import {http} from '../../../config/config'

export default{

    state: {
        items: {
            data: []
        }
    },
    mutations: {
        LOAD_MODULES(state, modules){
            state.items = modules
        }
    },
    actions: {

        loadModules(context, params){

            context.commit('PRELOADER', true)

            http.get('modules', {params})
                .then(response => {
                    console.log(response)
                    context.commit('LOAD_MODULES', response.data)
                }).catch(error => {
                    console.log('Erro: '+error)
                }).finally(() => context.commit('PRELOADER', false))
        },

        loadModule(context, id){

            context.commit('PRELOADER', true)

            return new Promise((resolve, reject)=>{

                http.get(`modules/${id}`)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
                .finally(() => context.commit('PRELOADER', false))

            })
        },

        storeModule(context, params){
            
            context.commit('PRELOADER', true)

            if(params.id){

                return new Promise((resolve, reject)=>{

                    http.put(`modules/${params.id}`, params)
                    .then(response => resolve())
                    .catch(error => reject(error))
                    .finally(() => context.commit('PRELOADER', false))
    
                })

            }else{

                return new Promise((resolve, reject)=>{

                    http.post('modules', params)
                    .then(response => resolve())
                    .catch(error => reject(error))
                    .finally(() => context.commit('PRELOADER', false))
    
                })

            }
  
        },

        destroyModule(context, id){
            context.commit('PRELOADER', true)

            return new Promise((resolve, reject)=>{

                http.delete(`modules/${id}`)
                .then(response => resolve())
                .catch(error => reject(error))
                //.finally(() => context.commit('PRELOADER', false))

            })
        },

    },
    getters: {

    }

}