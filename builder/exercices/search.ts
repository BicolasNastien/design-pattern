type Direction = 'ASC' | 'DESC';

interface SearchQuery {
  term: string;
  filters: Record<string, unknown>;
  sort: { field: string; direction: Direction } | null;
  page: number | null;
  limit: number | null;
}

interface ISearchQueryBuilder {
  query(term: string): this;
  filters(key: string, value: unknown): this;
  sortBy(field: string, direction: Direction): this;
  page(number: number | null): this;
  limit(count: number | null): this;
  build(): SearchQuery;
}

class SearchQueryBuilder implements ISearchQueryBuilder {
  private _term: string = '';
  private _filters: Record<string, unknown> = {};
  private _sortField: string | null = null;
  private _sortDirection: Direction = 'ASC';
  private _page: number | null = null;
  private _limit: number | null = null;

  query(term: string): this {
    this._term = term;
    return this;
  }

  filters(key: string, value: unknown): this {
    this._filters[key] = value;
    return this;
  }

  sortBy(field: string, direction: Direction): this {
    this._sortField = field;
    this._sortDirection = direction;
    return this;
  }

  page(page: number | null): this {
    this._page = page;
    return this;
  }

  limit(count: number | null): this {
    this._limit = count;
    return this;
  }

  build(): SearchQuery {
    return {
      term: this._term,
      filters: {... this._filters },
      sort: this._sortField ? { field: this._sortField, direction: this._sortDirection } : null,
      page: this._page,
      limit: this._limit,
    };
  }
}

const q = new SearchQueryBuilder()
  .query('typescript')
  .filters('category', 'books')
  .filters('lang', 'fr')
  .sortBy('price', 'DESC')
  .page(1)
  .limit(20)
  .build();
// -> { term: 'typescript', filters: { category: 'books', lang: 'fr' },
//      sort: { field: 'price', direction: 'DESC'}, page: 1, limit: 20 }
