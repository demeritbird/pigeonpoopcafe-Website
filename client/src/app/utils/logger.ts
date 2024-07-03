import { environment } from 'src/environments/environment';

export interface Logger {
  tag: string;
  type: 'success' | 'warning' | 'error';
  message: string;
}

export function logger(inputLog: Logger): void {
  const isProduction: boolean = environment.PRODUCTION;
  if (isProduction) return;

  switch (inputLog.type) {
    case 'success':
      console.log(
        `%c[${inputLog.tag}] %c${inputLog.message}`,
        'color: green; font-weight: bold'
      );
      break;
    case 'warning':
      console.log(
        `%c[${inputLog.tag}] %c${inputLog.message}`,
        'color: yellow; font-weight: bold'
      );
      break;
    case 'error':
      console.log(
        `%c[${inputLog.tag}] %c${inputLog.message}`,
        'color: red; font-weight: bold'
      );
      break;
  }
}
