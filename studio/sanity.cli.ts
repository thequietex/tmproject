import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'rownmujw',
    dataset: 'production',
  },
  studioHost: 'the-maturity-project',
  autoUpdates: true,
})
