/status
/status/remote
/status/remote/new
/status/remote/edit/:id?name="ABC"
/status/remote/history/:type/:id?name="ABC'

- /status/remote/history/collect/:id?name="ABC"
- /status/remote/history/error/:id?name="ABC"
- /status/remote/history/cras/:id?name="ABC"
- /status/remote/history/version/:id?name="ABC"

/status/local
/status/local/new
/status/local/history/:id

/configure

/rules

/account

/status
get /remote/:id remote job status list취득
get /remote/:id remote job status 세부 정보 취득
post /remote remote job 추가
delete /remote/:id remote job 삭제
put /remote/:id remote job 수정
patch /remote/:id/run remote job 시작
patch /remote/:id/stop remote job 중지
get /local/:id remote job status 리스트 취득
post /local remote job 추가

/configure
get /host setting database 취득
put /host setting databaes 수정

get /sites/names
get /site site list 취득
get /sites/:id site 세부 정보 취득
post /sites site 추가
put /sites/:id site 수정
delete /sites/:id site 삭제

/user get /:id user list 취득
post / user 추가
put /:id user 수정
delete /:id user 삭제
