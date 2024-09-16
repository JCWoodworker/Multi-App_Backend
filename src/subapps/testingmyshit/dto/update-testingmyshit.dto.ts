import { PartialType } from '@nestjs/mapped-types';
import { CreateTestingmyshitDto } from './create-testingmyshit.dto';

export class UpdateTestingmyshitDto extends PartialType(CreateTestingmyshitDto) {}
