// Types for compiled templates
declare module 'ember-responsive/templates/*' {
  import { TemplateFactory } from 'ember-cli-htmlbars';

  const tmpl: TemplateFactory;
  export default tmpl;
}

declare module 'ember-responsive/services/media' {
  import { default as MediaClass } from 'ember-responsive/services/media';

  type MediaService<T extends Record<string, string>> = MediaClass & { [key in keyof T]: boolean | undefined };

  export default MediaService;
}
