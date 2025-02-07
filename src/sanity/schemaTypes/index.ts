import { type SchemaTypeDefinition } from 'sanity';
import popularcar from '../popularcar';
import recommendedcar from '../recommendedcar';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [popularcar , recommendedcar]
}
