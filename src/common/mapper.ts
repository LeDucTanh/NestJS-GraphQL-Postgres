import { CoreEntity } from './entities/core.entity';

export class Mapper<T extends CoreEntity> {
  public mapObjectsToId(objects: T[], ids: number[]): T[] {
    const map = new Map(objects.map((obj) => [obj.id, obj]));
    return ids.map((id) => map.get(id));
  }
}
