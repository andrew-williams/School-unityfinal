#pragma strict

public class SoldierController extends MonoBehaviour {

	enum Dir { Up, Down, Right, Left, None }

	public var speed:float = 1.0;
	public var gunRanges:float[] = [ 10.0,6.0 ];
	public var gunObjs:GameObject[];
	public var knifeObj:GameObject;
	public var muzzleFlashes:GameObject[];
	public var soldierMesh:GameObject;
	public var hitCube:Transform;
	public var mousePos:Vector3;
	
	public var entityPrefab:Transform;
	public var sgbarrelm:Transform;
	public var sgbarrell:Transform;
	public var sgbarrelr:Transform;
	
	protected var flashNow:boolean = false;
	protected var isShooter:boolean = true;
	protected var shooting:boolean = false;
	protected var fTime:float = -1.0;	// Muzzle flash activate time;
		
	private var _anim:Animator;
	private var currentBaseState:AnimatorStateInfo;
	private var layer2CurrentState:AnimatorStateInfo;
	private var layer2TransInfo:AnimatorTransitionInfo;
	private var _cc:CharacterController;
	private var moveDir:Dir;
	private var animDir:float;
	private var animSpeed:float;
	private var ccRot:float;
	private var mfDelay:float[] = [ 0.15, 0.5 ];
	private var activeGun:int = 0;
	private var _ms:MetaScript;
	private var ccMoveDir:Vector3 = Vector3.zero;
	private var mfScales:Vector3;
	private var rayOrigin:Vector3;
	private var rayDir:Vector3;
	private static var meleeState:int = Animator.StringToHash("Throw/Melee.Melee");
	private static var throwState:int = Animator.StringToHash("Throw/Melee.Throw");

	function Start () {
		_anim = GetComponent(Animator);
		_cc = GetComponent(CharacterController);
		_ms = GameObject.Find("MetaHolder").GetComponent(MetaScript);
		if(_anim.layerCount == 2)
			_anim.SetLayerWeight(1, 1);
		_anim.SetFloat("Speed", 0.0);
		mfScales = muzzleFlashes[activeGun].transform.localScale;
		FlashOff();
		GunToKnife( false );
	}

	function Update () {
		currentBaseState = _anim.GetCurrentAnimatorStateInfo(0);
		if( _anim.layerCount == 2 )		
			layer2CurrentState = _anim.GetCurrentAnimatorStateInfo(1);
		layer2TransInfo = _anim.GetAnimatorTransitionInfo(1);
		ccMoveDir = Vector3( Input.GetAxis("Horizontal")*speed, 0, Input.GetAxis("Vertical")*speed);
		_cc.Move(ccMoveDir * Time.deltaTime);
		// Begin raycast for 'mouselook' feature.
		var ray:Ray = camera.main.ScreenPointToRay(Input.mousePosition);
		var hit:RaycastHit;
		if( Physics.Raycast(ray, hit) ) {
			hitCube.position = hit.point;
			hitCube.position.y = gameObject.transform.position.y;
			gameObject.transform.LookAt(hitCube.position);
		}
		if ( shooting ) {
			if ( flashNow ) {
				for ( var flash:Transform in muzzleFlashes[activeGun].transform )
					flash.renderer.enabled = true;
				muzzleFlashes[activeGun].transform.localScale = Vector3( mfScales.x * RandMF(), mfScales.y * RandMF(), mfScales.z * RandMF() );
				muzzleFlashes[activeGun].transform.eulerAngles = Vector3( muzzleFlashes[activeGun].transform.eulerAngles.x, muzzleFlashes[activeGun].transform.eulerAngles.y , Random.Range( 0, 36 ) );
				FireGun();
				fTime = Time.time;
				flashNow = false;
			}
			else if ( Time.time >= fTime + mfDelay[activeGun] ) {
				flashNow = true;
			}
			else if ( Time.time >= fTime + 0.05 ) {
				FlashOff();
			}
		}
		// Setting up movement animations.
		if ( Mathf.Abs(Input.GetAxis("Horizontal")) > 0 || Mathf.Abs(Input.GetAxis("Vertical")) > 0 ) 
			_anim.SetFloat("Speed", 1.0);
		if ( Input.GetAxis("Horizontal") > 0 ) {
			if ( Input.GetAxis("Vertical") > 0.5 )
				moveDir = Dir.Up;
			else if ( Input.GetAxis("Vertical") < -0.5 )
				moveDir = Dir.Down;
			else
				moveDir = Dir.Right;
		}
		else if ( Input.GetAxis("Horizontal") < 0 ) {
			if ( Input.GetAxis("Vertical") > 0.5 )
				moveDir = Dir.Up;
			else if ( Input.GetAxis("Vertical") < -0.5 )
				moveDir = Dir.Down;
			else 
				moveDir = Dir.Left;
		}
		else if ( Input.GetAxis("Vertical") > 0 ) 
			moveDir = Dir.Up;
		else if ( Input.GetAxis("Vertical") < 0 ) 
			moveDir = Dir.Down;
		else
			moveDir = Dir.None;
		ccRot = transform.eulerAngles.y;
		switch ( moveDir ) {
			case Dir.Up:
				if ( ccRot >= 315 && ccRot < 360 || ccRot >= 0 && ccRot < 45 ) // Up.
					SetBools( "Forward" );
				else if ( ccRot >= 45 && ccRot < 135 ) // Right.
					SetBools( "Right" );
				else if ( ccRot >= 135 && ccRot < 225 ) // Down.
					SetBools( "Backward" );
				else // if ( ccRot >= 225 && ccRot < 315 ) // Left.
					SetBools( "Left" );
				break;
			case Dir.Down:
				if ( ccRot >= 315 && ccRot < 360 || ccRot >= 0 && ccRot < 45 ) // Up.
					SetBools( "Backward" );
				else if ( ccRot >= 45 && ccRot < 135 ) // Right.
					SetBools( "Right" );
				else if ( ccRot >= 135 && ccRot < 225 ) // Down.
					SetBools( "Forward" );
				else // if ( ccRot >= 225 && ccRot < 315 ) // Left.
					SetBools( "Left" );
				break;
			case Dir.Right:
				if ( ccRot >= 315 && ccRot < 360 || ccRot >= 0 && ccRot < 45 ) // Up.
					SetBools( "Right" );
				else if ( ccRot >= 45 && ccRot < 135 ) // Right.
					SetBools( "Forward" );
				else if ( ccRot >= 135 && ccRot < 225 ) // Down.
					SetBools( "Left" );
				else // if ( ccRot >= 225 && ccRot < 315 ) // Left.
					SetBools( "Backward" );
				break;
			case Dir.Left:
				if ( ccRot >= 315 && ccRot < 360 || ccRot >= 0 && ccRot < 45 ) // Up.
					SetBools( "Left" );
				else if ( ccRot >= 45 && ccRot < 135 ) // Right.
					SetBools( "Backward" );
				else if ( ccRot >= 135 && ccRot < 225 ) // Down.
					SetBools( "Right" );
				else // if ( ccRot >= 225 && ccRot < 315 ) // Left.
					SetBools( "Forward" );
				break;
			case Dir.None:
				_anim.SetBool("Forward", false);
				_anim.SetBool("Backward", false);
				_anim.SetBool("Left", false);
				_anim.SetBool("Right", false);
				_anim.SetFloat("Speed", 0.0);
				break;
		}
		if ( Input.GetButton("Melee") && layer2CurrentState.nameHash != throwState ) {
			if( !_anim.IsInTransition(1) ) {
				_anim.SetBool("Meleeing", true);
				GunToKnife( true );
			}
		}
		else if ( Input.GetButton("Throw") && layer2CurrentState.nameHash != meleeState ) {
			Debug.Log("THROW");
			if( !_anim.IsInTransition(1) ) {
				_anim.SetBool("Throwing", true);
			}
		}
		if ( layer2TransInfo.IsUserName("MeleeToNone") ) {
			_anim.SetBool("Meleeing", false);
			GunToKnife( false );
		}
		else if ( layer2TransInfo.IsUserName("ThrowToNone") ) {
			_anim.SetBool("Throwing", false);
		}
		// Temporary gun switching code.
		if ( Input.GetKeyDown("g") ) {
			if ( activeGun == 0 ) SetActiveGun( 1 );
			else SetActiveGun( 0 );
		}
	}

	private function SetBools ( sIn:String ) {
		_anim.SetBool("Forward", false);
		_anim.SetBool("Backward", false);
		_anim.SetBool("Left", false);
		_anim.SetBool("Right", false);
		_anim.SetBool(sIn, true);
	}

	private function GunToKnife ( bIn:boolean ) {
		gunObjs[activeGun].SetActiveRecursively( !bIn );
		knifeObj.SetActiveRecursively( bIn );
	}

	protected function FlashOff() {
		for ( var flash:Transform in muzzleFlashes[activeGun].transform )
			flash.renderer.enabled = false;
	}

	private function RandMF() {
		return Random.Range( 0.5, 1.5 );
	}

	// Temporary gun swap function?
	public function SetActiveGun( gIn:int ) {
		if ( gIn == 0 ) {
			gunObjs[0].SetActiveRecursively( true );
			gunObjs[1].SetActiveRecursively( false );
		}
		else {
			gunObjs[1].SetActiveRecursively( true );
			gunObjs[0].SetActiveRecursively( false );
		}
		activeGun = gIn;
		mfScales = muzzleFlashes[activeGun].transform.localScale;
		FlashOff();
	}
	
	public function SetTeamMaterial( tIn:int ) {
		soldierMesh.renderer.material = _ms.matArray[tIn];
	}
	
	private function FireGun() {
	
		rayOrigin = muzzleFlashes[activeGun].transform.position;
		rayDir = muzzleFlashes[activeGun].transform.TransformDirection(Vector3.forward);
		Debug.DrawRay(rayOrigin, rayDir*gunRanges[activeGun], Color.red);
		var entityCreate:Transform;
		var entityCreate2:Transform;
		var entityCreate3:Transform;
		//var target:Transform = hitCube;
		if (activeGun == 0){ //MACHINEGUNS
			
			entityCreate = Instantiate (entityPrefab) as Transform; // Instantiate the entity
			
			entityCreate.transform.position = muzzleFlashes[activeGun].transform.position;
			entityCreate.rigidbody.AddForce(transform.forward * 3000);
		}
		else if (activeGun == 1){
			entityCreate = Instantiate (entityPrefab) as Transform; // Instantiate the entity
			entityCreate.transform.position = sgbarrelm.transform.position;
			entityCreate.rigidbody.AddForce(transform.forward * 3000);
			entityCreate2 = Instantiate (entityPrefab) as Transform; // Instantiate the entity
			entityCreate2.transform.position = sgbarrell.transform.position;
			entityCreate2.Rotate(0,20,0);
			entityCreate2.rigidbody.AddForce(transform.forward * 3000);
			entityCreate3 = Instantiate (entityPrefab) as Transform; // Instantiate the entity
			entityCreate3.transform.position = sgbarrelr.transform.position;
			entityCreate3.Rotate(0,-20,0);
			entityCreate3.rigidbody.AddForce(transform.forward * 3000);
			
		}
	}
}