import type { H3Event } from 'h3';
import { MongoClient } from 'mongodb';

export function getMongoClient(event: H3Event): MongoClient {
  return event.context.mongo;
}

export default function useMongoClient(event: H3Event): MongoClient {
  return event.context.mongo;
}
