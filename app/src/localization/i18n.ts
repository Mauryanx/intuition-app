import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';

import { translations, type TranslationSchema } from './translations';

const i18n = new I18n(translations);
i18n.defaultLocale = 'en';
i18n.enableFallback = true;
i18n.locale = Localization.getLocales()[0]?.languageCode ?? 'en';

type TranslationKey = NestedKeyOf<TranslationSchema>;

export function t(key: TranslationKey, params?: Record<string, unknown>): string {
  return i18n.t(key, params);
}

type NestedKeyOf<ObjectType> =
  ObjectType extends Record<string, unknown>
    ? {
        [Key in keyof ObjectType & string]: ObjectType[Key] extends Record<
          string,
          unknown
        >
          ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
          : `${Key}`;
      }[keyof ObjectType & string]
    : never;
