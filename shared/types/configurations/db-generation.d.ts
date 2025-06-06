import { TableColumn } from './tables-column'

export interface DBGeneration {
  config: boolean | TableColumn[]
  users: boolean | TableColumn[]
  logs: boolean | TableColumn[]
  loader: boolean | TableColumn[]
  bootstraps: boolean | TableColumn[]
  maintenance: boolean | TableColumn[]
  news: boolean | TableColumn[]
  news_categories: boolean | TableColumn[]
  news_tags: boolean | TableColumn[]
  backgrounds: boolean | TableColumn[]
  stats: boolean | TableColumn[]
  exp_jwt: boolean | TableColumn[]
}
