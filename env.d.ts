declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_S3_HOSTNAME: string;
      NEXT_PUBLIC_FIREBASE_API_KEY: string;
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string;
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: string;
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string;
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
      NEXT_PUBLIC_FIREBASE_APP_ID: string;
      NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: string;
      NEXT_PUBLIC_API_URL: string;
      NEXT_PUBLIC_SERVER_NON_API_ERROR_REGEX: string;
      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
    }
  }
}

export {}
