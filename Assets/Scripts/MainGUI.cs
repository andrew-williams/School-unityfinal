using UnityEngine;
using System.Collections;

public class MainGUI : MonoBehaviour {
	
	public int seconds;
	public int dogtags;
	public int framecount;
	public const int FPS = 60;
	
	void Start () {
		initializeMinigame();	
		framecount = FPS;
	}
	
	void initializeMinigame(){
		seconds = 300;
		dogtags = 6;
		
	}
	
	void Update () {
		if (framecount == 0){
			framecount = FPS;
			seconds = seconds - 1;
			if (seconds < 0){
				seconds = 0;
			}
		}
		else{
			framecount = framecount - 1;	
		}
	}
	
	void OnGUI () {
		GUI.Box( new Rect(8,8,80,50),"Status Bar");
		GUI.Label(new Rect(12,24,70,20),"Time: " + seconds);
		GUI.Label(new Rect(12,36,70,20),"Tags: " + dogtags);
	}
	
	void taketagtoken(){
		dogtags = dogtags - 1;
		if (dogtags == 0){
			Debug.Log ("YOU WIN!!!!!! YOU WIN!!!!!");	
		}
	}
	
}
