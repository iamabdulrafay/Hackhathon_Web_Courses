# courses/models.py

from django.db import models

class Courses(models.Model):
    title = models.CharField(max_length=200)
    image_url = models.ImageField(upload_to="course_thumbnails/", default='night.jpg')
    description = models.TextField()
    price = models.DecimalField(decimal_places=2, max_digits=10)
    instructor_name = models.CharField(max_length=200)
    course_tags = models.CharField(max_length=200, help_text="Values are separated by commas")

    def __str__(self):
        return self.title

class CourseDetails(models.Model):
    course = models.OneToOneField(Courses, on_delete=models.CASCADE, related_name='details')
    image_one_url = models.ImageField(upload_to="course_desc/", default='night.jpg')
    # image_two_url = models.ImageField(upload_to="course_desc/", default='night.jpg')
    course_short_title = models.CharField(max_length=50)
    course_level = models.CharField(max_length=50)

    def __str__(self):
        return self.course_short_title
class CourseOutline(models.Model):
    course = models.ForeignKey(Courses, related_name='course_outlines', on_delete=models.CASCADE)
    section_title = models.CharField(max_length=200)
    content = models.TextField(default="Default text")

    def __str__(self):
        return self.section_title

class CourseVideo(models.Model):
    outline = models.ForeignKey(CourseOutline, related_name='course_videos', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    video_content = models.TextField(default="Default text")
    video_file = models.FileField(upload_to="course_videos/")

    def __str__(self):
        return self.title
