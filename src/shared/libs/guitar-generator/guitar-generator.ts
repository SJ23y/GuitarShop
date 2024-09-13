import { getRandomElement } from '../../helpers/common.js';
import { GuitarGenerator } from './guitar-generator.interface.js';
import { faker } from '@faker-js/faker';
import { guitarsLabels, stringsnumberByType } from './mock-data.js';
import { TypeOfGuitar } from '@prisma/client';
import { Guitar } from '../../types/guitar.type.js';
import { defaultImages } from '../../constants/const.js';

export class DefaultGuitarGenerator implements GuitarGenerator {
  generate(): Guitar {
    const date = new Date();
    const title = `${getRandomElement(guitarsLabels)} ${faker.string.alphanumeric({length: { min: 4, max: 6 }, casing: 'upper' })}`;
    const price = faker.number.int({ min: 100, max: 1000000 });
    const articul = faker.string.alphanumeric({length: { min: 8, max:8 }, casing: 'upper' });
    const description = faker.lorem.text;
    const type = getRandomElement(Object.values(TypeOfGuitar));
    const picture = getRandomElement(defaultImages);
    const stringsNumber = getRandomElement(stringsnumberByType[type]);

    return {
      date,
      title,
      price,
      articul,
      description,
      picture,
      type,
      stringsNumber
    }
  }
}
