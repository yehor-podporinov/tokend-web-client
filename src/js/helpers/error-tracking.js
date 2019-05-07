import * as sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'
import Vue from 'vue'

export class ErrorTracking {
  static init (config) {
    sentry.init({
      dsn: config.SENTRY_DSN,
      release: config.BUILD_VERSION,
      integrations: [
        new Integrations.Vue({
          Vue,
          attachProps: true,
        }),
      ],
    })
  }

  static setLoggedInUser ({ accountId = '', email = '' }) {
    sentry.configureScope((scope) => {
      scope.setUser({
        'accountId': accountId,
        'email': email,
      })
    })
  }

  static trackMessage (msg) {
    sentry.captureMessage(msg)
  }
}
