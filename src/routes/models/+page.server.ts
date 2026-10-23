import { readFileSync } from 'fs';
import TOML from '@iarna/toml';
import { ModelsSchema } from '$lib/types';

export const load = () => ModelsSchema.parse(TOML.parse(readFileSync('content/models.toml', 'utf8')));
