import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export class BrokenLink extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    song_id: string;
}