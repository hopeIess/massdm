@echo off

set name=none
for /f "delims=?" %%i in ('dir *.jar /b /o:g-n') do set "name=%%i" & goto :run

:run
if "%name%" == none echo There is no file to run & exit /b

echo Running %name%
java -Dfile.encoding=UTF8 -jar "%name%"