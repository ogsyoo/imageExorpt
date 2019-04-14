import Vue from 'vue'
import Router from 'vue-router'
import job from '@/components/job'
import detail from '@/components/detail'
import addjob from '@/components/addjob'
import updatejob from '@/components/updatejob'
import packagejob from '@/components/package'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'job',
            component: job
        },
        {
            path: '/detail/:pid',
            name: 'detail',
            component: detail
        },
        {
            path: '/addjob',
            name: 'addjob',
            component: addjob
        },
        {
            path: '/updatejob/:id',
            name: 'updatejob',
            component: updatejob
        },
        {
            path: '/package',
            name: 'packagejob',
            component: packagejob
        }
    ]
})
