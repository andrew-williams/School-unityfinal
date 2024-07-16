#pragma strict

public class InfantryController extends SoldierController {
	
	function Start () {
		super.Start();
		isShooter = true;
		SetTeamMaterial( Random.Range(0,8) );
	}

	function Update () {
		super.Update();
		if ( Input.GetMouseButtonDown(0) ) {
			if ( isShooter ) {
				shooting = true;
				flashNow = true;
			}
			else DoAction();
		}
		if ( Input.GetMouseButtonUp(0) ) {
			if ( isShooter ) {
				shooting = false;
				FlashOff();
				flashNow = false;
				fTime = -1;
			}
		}
		
	}
	
	private function DoAction() {
		print("Doing action!");
	}
	
	
}