import { setLocale } from './i18n'

export default async ({ store, Vue }) => {
    //    await store.dispatch('statistics/fetchStatistics');
    var curlang = ''
    var defaultLangString = ''

    await store.dispatch('features/fetchFeatures');
    await store.dispatch("language/fetchActiveLanguages")

    await store.dispatch('settings/fetchSettings')
        .then(settings => {
            console.log("#####################################")
            console.log(settings)
            curlang = settings.filter((setting) => { return setting.key == 'default_language' })[0]
            setLocale(curlang.value)
            defaultLangString = store.state.language.languages.filter(function (l) { return l.lang == curlang.value })[0].name
            Vue.prototype.$defaultLangString = defaultLangString
            Vue.prototype.$defaultLang = curlang.value
            // somewhere we need to set the userLang reading it dfrom the user preferences and we will override this value

            Vue.prototype.$userLang = curlang.value


        })
    console.log("READ LANGUAGES SO CAN SET PROPERLY STUFF")
    console.log(curlang.value)
    console.log(defaultLangString)
    console.log(Vue.prototype.$defaultLang)
    console.log(Vue.prototype.$userLang)
    await store.dispatch('topic/fetchTopic', { defaultLang: Vue.prototype.$defaultLang, userLang: Vue.prototype.$userLang })
    await store.dispatch('user_type/fetchUserType', { defaultLang: Vue.prototype.$defaultLang, userLang: Vue.prototype.$userLang })
    // somewhere we need to set the userLang reading it dfrom the user preferences

}

