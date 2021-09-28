export const AZURE_SSO = 'azuresso';
const DB = 'db';
const LDAP = 'ldap';

export const CONFIGURATIONS = {
    required: {
        APP_NAME: 'PacBot',
        domains: {
            PROD_BASE_URL: '', // Expected values: domain where the API is deployed, ex: http://beta.pacbot.com/api
            STG_BASE_URL: '', // Expected values: domain where the API is deployed, ex: http://stgbeta.pacbot.com/api
            DEV_BASE_URL: '', // Expected values: domain where the API is deployed, ex: http://devbeta.pacbot.com/api
            CLOUD_BASE_URL: '', // Expected values: domain where the API is deployed
        },
        featureModules: {
            COMPLIANCE_MODULE: true, // Expected values: true || false
            ASSETS_MODULE: true, // Expected values: true || false
            OMNI_SEARCH_MODULE: true, // Expected values: true || false
            TOOLS_MODULE: false, // Expected values: true || false
            ADMIN_MODULE: true, // Expected values: true || false
        },
    },
    optional: {
        auth: {
            AUTH_TYPE: DB, // AZURE_SSO | DB | LDAP
            adConfig : {
                tenant: '', // Expected values: Value expected if 'AD_AUTHENTICATION' is true
                clientId: '' // Expected values: Value expected if 'AD_AUTHENTICATION' is true
            }
        },
        pacmanIssue: {
            CREATE_JIRA_TICKET_FOR_PACMAN_ISSUE: false, // Expected values: true || false || ''
            emailPacManIssue: {
                ISSUE_MAIL_TEMPLATE_URL: '',
                ISSUE_EMAIL_FROM_ID: 'violations.support@pacbot.org',
            }
        },
        assetDetails: {
            ASSET_DETAILS_TEMPLATE_URL: '',
            ASSET_DETAILS_FROM_ID: '',
        },
        general: {
            ACCESS_MANAGEMENT_PORTAL_URL: '',
            e2e: {
                DOMAIN: 'http://localhost:4200',
                EMAIL_ID: '',
                NT_ID: '', // Add NT ID for e2e login
                NT_PASSWORD: '' // Add respective password for e2e login
            },
            qualysEnabled: false,
            OSS: true
        }
    }
};
