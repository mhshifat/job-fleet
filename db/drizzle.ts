import { drizzle } from 'drizzle-orm/postgres-js';
import postgres  from 'postgres';

if (!process.env.DATABASE_URI) {
  throw new Error('Missing DATABASE_URI');
}

function singleton<Value>(name: string, value: () => Value): Value {
  const globalAny: any = global;
  globalAny.__singletons = globalAny.__singletons || {};
  
  if (!globalAny.__singletons[name]) {
    globalAny.__singletons[name] = value();
  }
  
  return globalAny.__singletons[name];
}

function createDatabaseConnection() {
  const queryClient = postgres(process.env.DATABASE_URI!);
  return drizzle(queryClient);
}

export const db = singleton('db', createDatabaseConnection);