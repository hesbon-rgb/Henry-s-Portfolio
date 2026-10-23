import { readFileSync } from 'fs';
import TOML from '@iarna/toml';
import { ListPageSchema } from './types';

export const loadList = (name: string) =>
	ListPageSchema.parse(TOML.parse(readFileSync(`content/${name}.toml`, 'utf8')));
