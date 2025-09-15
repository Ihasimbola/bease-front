import type { Schema, Struct } from '@strapi/strapi';

export interface PubPub extends Struct.ComponentSchema {
  collectionName: 'components_pub_pubs';
  info: {
    displayName: 'Pub';
  };
  attributes: {};
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'pub.pub': PubPub;
    }
  }
}
