import { ColorId } from "unsplash-js";

export interface ColorOption {
  label: string;
  value: ColorId;
}

export const colorOptions: ColorOption[] = [
  {
    label: 'Black and White',
    value: 'black_and_white',
  },
  {
    label: 'Black',
    value: 'black',
  },
  {
    label: 'White',
    value: 'white',
  },
  {
    label: 'Yellow',
    value: 'yellow',
  },
  {
    label: 'Orange',
    value: 'orange',
  },
  {
    label: 'Red',
    value: 'red',
  },
  {
    label: 'Purple',
    value: 'purple',
  },
  {
    label: 'Magenta',
    value: 'magenta',
  },
  {
    label: 'Green',
    value: 'green',
  },
  {
    label: 'Teal',
    value: 'teal',
  },
  {
    label: 'Blue',
    value: 'blue',
  },
];
