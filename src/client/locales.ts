/**
 * Locale dictionaries for the `dsh-plugin-sidebar-brand-text` namespace.
 *
 * @module @huanlin/dsh-plugin-sidebar-brand-text/client/locales
 */

/** The locale keys the settings card reads. */
export type BrandTextKey =
  | 'card.title'
  | 'card.intro'
  | 'card.unsaved'
  | 'card.saved'
  | 'card.saving'
  | 'card.discard'
  | 'card.save'
  | 'card.unavailable'
  | 'card.retry'
  | 'field.name.label'
  | 'field.name.placeholder'
  | 'field.name.hint'
  | 'field.revision.label'
  | 'field.revision.placeholder'
  | 'field.revision.hint'

/** The locale namespace name; matches the `locale: NS` passed at slot register. */
export const NS = 'dsh-plugin-sidebar-brand-text'

/** English dictionary. */
export const en: Record<BrandTextKey, string> = {
  'card.title': 'Sidebar Brand Text',
  'card.intro': 'Replace the sidebar brand name and revision badge with custom text.',
  'card.unsaved': 'Unsaved',
  'card.saved': 'Saved',
  'card.saving': 'Saving…',
  'card.discard': 'Discard',
  'card.save': 'Save',
  'card.unavailable': 'The sidebar-brand-text configuration channel is unavailable. Please retry later.',
  'card.retry': 'Retry',
  'field.name.label': 'Brand name',
  'field.name.placeholder': 'DSH Local Build',
  'field.name.hint': 'Text shown in the sidebar next to the logo. Replaces the default "DSH Local Build".',
  'field.revision.label': 'Revision badge',
  'field.revision.placeholder': 'e.g. v1.0.0 or abc1234',
  'field.revision.hint': 'Small badge text beside the brand name. Leave empty to hide the badge.',
}

/** Chinese dictionary. */
export const zh: Record<BrandTextKey, string> = {
  'card.title': '侧边栏品牌文案',
  'card.intro': '替换侧边栏左上角的品牌名与构建徽标文案。',
  'card.unsaved': '未保存',
  'card.saved': '已保存',
  'card.saving': '保存中…',
  'card.discard': '放弃',
  'card.save': '保存',
  'card.unavailable': '侧边栏品牌文案配置通道不可用，请稍后重试。',
  'card.retry': '重试',
  'field.name.label': '品牌名称',
  'field.name.placeholder': 'DSH Local Build',
  'field.name.hint': '侧边栏 logo 右侧显示的文案。替换默认的「DSH Local Build」。',
  'field.revision.label': '版本徽标',
  'field.revision.placeholder': '如 v1.0.0 或 abc1234',
  'field.revision.hint': '品牌名右侧的小徽标文案。留空则不显示徽标。',
}
