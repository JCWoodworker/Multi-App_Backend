import { PartialType } from '@nestjs/mapped-types';
import { CreateNewfuckingsubappDto } from './create-newfuckingsubapp.dto';

export class UpdateNewfuckingsubappDto extends PartialType(CreateNewfuckingsubappDto) {}
