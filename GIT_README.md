# 커밋 메시지 유형

- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `BREAKING CHANGE`: 호환되지 않는 변경 사항
- `docs`: 문서 변경 사항
- `style`: 스타일 및 서식 변경 사항
- `ci`: CI/CD 관련 변경 사항
- `refactor`: 코드 품질 개선 변경 사항
- `test`: 테스트 코드 변경 사항
- `build`: 빌드 시스템 변경 사항
- `perf`: 성능 개선 변경 사항
- `chore`: 기타 변경 사항
- `delete`: remove와 유사하게, 주로 파일이나 코드의 삭제.

# 커밋 메시지 수정 방법

## 1. 직전 커밋 메시지만 수정

```bash
git commit --amend -m "새로운 커밋 메시지"
```

## 2. 직전 커밋 취소 (상황별)

### 커밋만 취소, 변경사항은 staging area에 유지

```bash
git reset --soft HEAD~1
```

### 커밋과 staging 취소, 변경사항은 working directory에 유지

```bash
git reset HEAD~1
# 또는
git reset --mixed HEAD~1
```

### 모든 변경사항 완전히 되돌리기 (⚠️ 주의!)

```bash
git reset --hard HEAD~1
```

## 3. 특정 커밋 메시지 골라서 수정하기 (Interactive Rebase)

### 최근 N개 커밋 중에서 선택

```bash
# 최근 5개 커밋을 확인하고 수정
git rebase -i HEAD~5

# 또는 특정 커밋 이후부터 수정
git rebase -i [커밋해시]
```

### 편집기에서 작업할 내용 선택

```
pick a1b2c3d 첫 번째 커밋 메시지
edit e4f5g6h 두 번째 커밋 메시지  <- 이 커밋 메시지 수정
pick i7j8k9l 세 번째 커밋 메시지
squash m1n2o3p 네 번째 커밋 메시지  <- 이전 커밋과 합치기
drop q4r5s6t 다섯 번째 커밋 메시지  <- 이 커밋 삭제
```

### 명령어 옵션들

- `pick` (또는 `p`): 커밋을 그대로 사용
- `edit` (또는 `e`): 커밋 메시지 수정
- `reword` (또는 `r`): 커밋 메시지만 수정 (내용은 그대로)
- `squash` (또는 `s`): 이전 커밋과 합치고 메시지도 합치기
- `fixup` (또는 `f`): 이전 커밋과 합치되 메시지는 이전 것만 사용
- `drop` (또는 `d`): 커밋 삭제

### 수정 과정

1. `edit`로 설정한 커밋에서 멈춤
2. 커밋 메시지 수정: `git commit --amend -m "새 메시지"`
3. 다음으로 진행: `git rebase --continue`
4. 모든 수정이 끝날 때까지 반복

### 예시: 3번째 전 커밋 메시지 수정하기

```bash
# 1. 최근 3개 커밋 확인
git log --oneline -3

# 2. Interactive rebase 시작
git rebase -i HEAD~3

# 3. 편집기에서 수정할 커밋을 'edit'로 변경
# 4. 저장 후 종료
# 5. 해당 커밋에서 메시지 수정
git commit --amend -m "수정된 커밋 메시지"

# 6. rebase 계속 진행
git rebase --continue
```

### ⚠️ 주의사항

- **이미 원격에 push된 커밋은 수정하지 말 것!**
- 다른 사람과 공유하는 브랜치에서는 사용 금지
- 수정 중 문제 생기면: `git rebase --abort`로 취소

# Git 충돌(Conflict) 해결 방법

## 1. 충돌 발생 시 상황 파악

```bash
# 충돌 상태 확인
git status

# 충돌 파일 확인
git diff
```

## 2. 충돌 해결 과정

### VS Code 사용 시

- "Accept Current Change" (현재 변경사항 수용)
- "Accept Incoming Change" (들어오는 변경사항 수용)
- "Accept Both Changes" (양쪽 변경사항 모두 수용)
- "Compare Changes" (변경사항 비교)

## 3. 충돌 해결 후 처리

```bash
# 충돌 해결된 파일 staging
git add [충돌해결된파일명]

# 모든 충돌 해결 후
git add .

# merge 계속 진행
git commit
# 또는 rebase 중이었다면
git rebase --continue
```

## 4. 충돌 해결 취소

```bash
# merge 취소
git merge --abort

# rebase 취소
git rebase --abort

# cherry-pick 취소
git cherry-pick --abort
```

# Git 브랜치 관리

## 브랜치 생성 및 전환

```bash
# 새 브랜치 생성
git branch [브랜치명]

# 브랜치 생성과 동시에 전환
git checkout -b [브랜치명]
# 또는
git switch -c [브랜치명]

# 브랜치 전환
git checkout [브랜치명]
# 또는
git switch [브랜치명]
```

## 브랜치 병합

```bash
# main으로 전환 후 병합
git checkout main
git merge [브랜치명]

# 병합 후 브랜치 삭제
git branch -d [브랜치명]
```

---

# 자주 사용하는 Git 명령어

```bash
# 상태 확인
git status

# 변경사항 확인
git diff

# 로그 확인
git log --oneline -10

# 원격 저장소 동기화
git fetch
git pull

# 특정 커밋으로 이동 (임시)
git checkout [커밋해시]

# 특정 파일만 되돌리기
git checkout HEAD -- [파일명]

# 스테이징 취소
git reset HEAD [파일명]

# 최근 커밋과 비교
git diff HEAD~1
```
