/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import DocumentItem from '../../../src/components/DocumentItem.vue'
import * as All from 'quasar'
// import langEn from 'quasar/lang/en-us' // change to any language you wish! => this breaks wallaby :(
const { Quasar, date } = All

const components = Object.keys(All).reduce((object, key) => {
  const val = All[key]
  if (val && val.component && val.component.name != null) {
    object[key] = val
  }
  return object
}, {})

describe('Mount Quasar', () => {
  const localVue = createLocalVue()
  localVue.use(Quasar, { components }) // , lang: langEn

  const wrapper = mount(DocumentItem, {
    localVue, propsData: { theDoc: {
      "id":1,
      "title":"ID card",
      "type":"Identity document",
      "image":"http://3.citynews-arezzonotizie.stgy.ovh/~media/original-hi/908048402755/numero-carta-identita-elettronica-2.jpg",
      "expire_date": "31/12/2020",
      "emitter": "Municipality of Bologna"
    } }
  })
  const vm = wrapper.vm

  it('passes the sanity check and creates a wrapper', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('accesses the DocumentItem', () => {
    expect(vm.$el.textContent).toContain('ID card')
    expect(wrapper.text()).toContain('ID card') // easier
  })
})
