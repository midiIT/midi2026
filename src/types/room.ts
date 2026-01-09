export interface RoomType {
  id: string;
  name: string;
  description: string;
  gridPosition: { row: number; col: number };
  icon?: string;
}

export const ROOMS: RoomType[] = [
  {
    id: '1',
    name: 'Room 1',
    description: 'Room 1',
    gridPosition: { row: 1, col: 1 },
  },
  {
    id: '2',
    name: 'Room 2',
    description: 'Room 2',
    gridPosition: { row: 1, col: 2 },
  },
  {
    id: '3',
    name: 'Room 3',
    description: 'Room 3',
    gridPosition: { row: 1, col: 3 },
  },
    {
    id: '4',
    name: 'Room 4',
    description: 'Room 4',
    gridPosition: { row: 1, col: 1 },
  },
  {
    id: '5',
    name: 'Room 5',
    description: 'Room 5',
    gridPosition: { row: 1, col: 2 },
  },
  {
    id: '6',
    name: 'Room 6',
    description: 'Room 6',
    gridPosition: { row: 1, col: 3 },
  },
  
];