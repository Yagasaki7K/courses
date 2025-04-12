import { Injectable } from '@nestjs/common';
import { Course } from './entities/course.entity';

@Injectable()
export class CourseService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'NestJS',
      description: 'Fundamentos do NestJS',
      price: 100,
      tags: ['nestjs', 'javascript', 'typescript'],
    },
  ];

  findAll() {
    return this.courses;
  }

  findOne(id: string) {
    return this.courses.find((course: Course) => course.id === Number(id));
  }

  create(createCourseDto: any) {
    this.courses.push(createCourseDto);
  }

  update(id: string, updateCourseDto: any) {
    const existingCourse = this.courses.findIndex(
      (course: Course) => course.id === Number(id),
    );
    this.courses[existingCourse] = updateCourseDto;
  }

  remove(id: string) {
    const indexCourses = this.courses.findIndex(
      (course: Course) => course.id === Number(id),
    );

    if (indexCourses >= 0) {
      this.courses.splice(indexCourses, 1);
    }
  }
}
