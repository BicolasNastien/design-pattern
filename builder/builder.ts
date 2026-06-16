interface QueryBuilder {
  table(name: string): this;
  select(...columns: string[]): this;
  where(condition: string): this;
  orderBy(column: string, direction?: 'ASC' | 'DESC'): this;
  limit(count: number): this;
  build(): string;
}

class SqlQueryBuilder implements QueryBuilder {
  private _table: string = '';
  private _columns: string[] = [];
  private _where: string = '';
  private _direction: string = 'ASC';
  private _orderBy: string = '';
  private _limit: number = 0;

  table(name: string): this {
    this._table = name;
    return this;
  }

  select(...columns: string[]): this {
    this._columns = columns;
    return this;
  }

  where(condition: string): this {
    this._where = condition;
    return this;
  }

  orderBy(column: string, direction?: 'ASC' | 'DESC'): this {
    this._orderBy = column;
    if (direction) { this._direction = direction; }
    return this;
  }

  limit(count: number): this {
    this._limit = count;
    return this;
  }

  build(): string {
    const cols = this._columns.length > 0 ? this._columns.join(', '): '*';
    let query = `SELECT ${cols} FROM ${this._table}`;
    if (this._where) query += ` WHERE ${this._where}`;
    if (this._orderBy) query += ` ORDER BY ${this._orderBy} ${this._direction}`;
    query += ` LIMIT ${this._limit}`;

    return query;
  }
}
