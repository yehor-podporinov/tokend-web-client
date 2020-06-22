import AdvancedStepForm from './advanced-step-form'

import Vuelidate from 'vuelidate'

import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import accountModule from '@/vuex/account.module'
import { vuexTypes } from '@/vuex/types'
import { AssetCollector } from '@/js/collectors/AssetCollector'

const localVue = createLocalVue()
localVue.use(Vuelidate)
localVue.filter('globalize', sinon.stub())
localVue.directive('ripple', sinon.stub())

describe('Advanced step form', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  // TODO: test validation rules

  describe('component', () => {
    let wrapper

    beforeEach(() => {
      sandbox.stub(accountModule.getters, vuexTypes.accountId)
        .returns('SOME_ACCOUNT_ID')
      const store = new Vuex.Store({ getters: accountModule.getters })
      const propsData = { collector: new AssetCollector() }
      wrapper = shallowMount(AdvancedStepForm, { localVue, store, propsData })
    })

    describe('next', () => {
      it('emits next event with correct payload', () => {
        sandbox.stub(wrapper.vm, 'isFormValid').returns(true)
        sandbox.stub(wrapper.vm.collector, 'add')
        wrapper.setData({
          form: { initialPreissuedAmount: '100.000000' },
        })

        wrapper.vm.next()

        expect(wrapper.vm.collector.add).to.have.been.calledWithMatch({ initialPreissuedAmount: '100.000000' })
        expect(wrapper.emitted('next')).to.exist
      })
    })
  })
})
