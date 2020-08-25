export default {
    data() {
        return {
            activeLanguage: this.$userLang,
            langTab: this.$defaultLangString,

        }
    },
    computed: {
        languages() {
            return this.$store.state.language.languages;
        },
    },
    methods: {
        filterTranslationModel(currentLang) {
            return function (element) {
                return element.lang == currentLang;
            }
        }
    }
};
