type UseState = "WAIT" | "USE" | "RETURN" | "RENTAL"
// RENTAL 상태 : 대여 요청을 위한 유효성 검사
// RETURN 상태 : 반납을 위한 유효성 검사
// WAIT : 대여 가능 상태
// USE : 대여 진행 상태

type MethodState = "REJECTED" | "APPROVED";

// RentalDetail 엔티티 객체
// 이용 정보에 대한 상세 기록
// id 데이터베이스의 Auto incrment 값을 저장하여 대여 기록을 식별한다
class Detail {
    private id : number;
    private readonly startTime : Date;
    private endTime ?: Date;
    private readonly startCoordinate : number[];
    private endCoordinate ?: number[];

    constructor(
        id : number,
        startTime : Date,
        startCoordinate : number[]
    ) {
        if(!startTime || startTime.getTime() <= new Date().getTime() ) throw Error("Invalid startTime time");
        if(!startCoordinate) throw Error("Invalid Coordinate");
        if(!id || id === 0 ) throw Error("Invalid ID");

        this.id = id;
        this.startTime = startTime;
        this.startCoordinate = startCoordinate;
    }

    // 반납 정보 디테일 획득 메서드
    // TODO : 타입 선언 필요
    getDetail(){
        return {
            startTime : this.startTime,
            endTime : this.endTime,
            startCoordinate : this.startCoordinate,
            endCoordinate : this.endCoordinate
        }
    }

    // 이용 완료 상태인지 검사하는 메서드
    useCompleted(): boolean{
        return this.endCoordinate != null && this.startCoordinate != null && true && this.startTime != null && this.endTime != null;
    }

    // 반납 좌표 설정
    setEndDetail(
        endTime: Date,
        endCoordinate : number[]){
        // 간단한 반납 정보 입력 규칙
        // 시작 시간과 같거나 좌표값이 값은 경우 입력 배제
        if(this.startTime === endTime) throw Error("Invalid endTime time");
        if(this.startCoordinate === endCoordinate) throw Error("Invalid startCoordinate");

        this.endTime = endTime;
        this.endCoordinate = endCoordinate;
    }
}

// 디바이스 정보를 저장한 밸류 객체
// 별도의 비즈니스 규칙 없음
class Device {
    private readonly id : string;
    private readonly auth : string;
    private readonly bleId : string;

    constructor(id : string, auth : string, bleId : string) {
        this.id = id;
        this.auth = auth;
        this.bleId = bleId;
    }

     getId(){
        return this.id;
     }

     getAuth(){
        return this.auth;
     }

     getBleId(){
        return this.bleId;
     }
}

class PayMethod {
    private state : MethodState

    constructor(state : MethodState) {
        this.state = state;
    }

    getState(){
        return this.state;
    }
}

// 대여 상태 엔티티 객체
// 시작 시간과 시작 좌표를 입력할 수 있다.
// 종료 시간과 종료 좌표를 입력할 수 있다.
class rental {
    private readonly useState : UseState;
    private readonly detail : Detail;
    private readonly user : User;
    private readonly device : Device;
    private readonly payMethod: PayMethod;

    constructor() {
    }

    //반납 진행 가능 여부 체크
    // 사용자 상태 USE인 경우만 진행 가능
    // 종료 좌표가 입력되었는지 useComplate를 통해 확인
    // 이후 changeState 호출하여 상태 RETURN 변경
    checkRefound(){

    }

    // WAIT 인 경우 RENTAL로 상태 변경
    // WAIT RENTAL 상태일때만 진행 가능
    // PayMethod 검증 상태가 APPROVED인 경우에만 대여 진행 가능
    // 아닌 경우 false 반환
    changeState(){

    }

    checkUseState(id : string) : UseState {
        if(this.user.getId() === id) throw Error("User not Valide");
        return this.useState
    }

    getUseDetail(id : string){
        if(this.user.getId() === id) throw Error("User not Valide");
        return this.detail
    }
}

