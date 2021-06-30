import { IsString } from 'class-validator';

class CreateMeetingDto {
	@IsString()
	public participant: string;
}

export default CreateMeetingDto;
